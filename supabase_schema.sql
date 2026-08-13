-- Setup inicial do Banco de Dados PostgreSQL (Supabase) para EVS SaaS

-- Habilitar a extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Unidades (Locations)
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Perfis de Usuários (Estendendo a tabela auth.users do Supabase se necessário, ou mantendo separado)
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE -- admin, manager, attendant, stock, financial
);

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY, -- Referencia auth.users(id)
    role_id UUID REFERENCES roles(id),
    location_id UUID REFERENCES locations(id),
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Clientes (CRM)
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    code VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    whatsapp VARCHAR(20),
    email VARCHAR(255),
    cpf VARCHAR(14),
    birth_date DATE,
    gender VARCHAR(20),
    origin VARCHAR(100),
    referred_by UUID REFERENCES customers(id),
    observations TEXT,
    status VARCHAR(20) DEFAULT 'novo', -- ativo, inativo, novo, recorrente
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Categorias de Produtos
CREATE TABLE product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL, -- shakes, proteinas, chas, etc
    type VARCHAR(50) -- 'sale' (venda final), 'inventory' (insumo), 'both'
);

-- 5. Produtos e Estoque (Insumos e Produtos Finais)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    category_id UUID REFERENCES product_categories(id),
    code VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    unit_of_measure VARCHAR(20), -- g, ml, un
    package_weight DECIMAL(10,2), -- Ex: 550g
    current_stock DECIMAL(10,2) DEFAULT 0,
    minimum_stock DECIMAL(10,2) DEFAULT 0,
    ideal_stock DECIMAL(10,2) DEFAULT 0,
    cost_price DECIMAL(10,2) DEFAULT 0,
    selling_price DECIMAL(10,2), -- Pode ser nulo se for apenas insumo
    supplier VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Receitas (Fichas Técnicas)
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_product_id UUID REFERENCES products(id), -- Produto final vendido (Ex: Shake Morango)
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Itens da Receita (Ingredientes que compõem o produto final)
CREATE TABLE recipe_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    inventory_product_id UUID REFERENCES products(id), -- Insumo (Ex: Pó de Morango)
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL
);

-- 7. Visitas / Check-in
CREATE TABLE customer_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id),
    location_id UUID REFERENCES locations(id),
    attendant_id UUID REFERENCES user_profiles(id),
    visit_type VARCHAR(50), -- consumo, consulta, retirada...
    is_guest BOOLEAN DEFAULT false, -- Visitante não cadastrado
    guest_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Vendas e PDV
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES locations(id),
    customer_id UUID REFERENCES customers(id),
    attendant_id UUID REFERENCES user_profiles(id),
    visit_id UUID REFERENCES customer_visits(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sale_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- Pagamentos
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
    payment_method VARCHAR(50), -- pix, dinheiro, debito, credito
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Movimentações de Estoque
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id),
    location_id UUID REFERENCES locations(id),
    user_id UUID REFERENCES user_profiles(id),
    movement_type VARCHAR(50), -- entrada, saida, consumo, perda, vencimento, ajuste
    quantity DECIMAL(10,2) NOT NULL,
    reason TEXT,
    sale_id UUID REFERENCES sales(id), -- Vinculado a uma venda (se for consumo automático)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Auditoria (Log)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id),
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função Trigger para atualizar o 'updated_at' de forma automática
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Exemplo de Trigger aplicado (fazer para as demais)
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
