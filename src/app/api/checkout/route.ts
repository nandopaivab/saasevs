import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { cart, customerId } = data;
    
    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    const total = cart.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);

    // Using transaction to ensure all stock changes and sale creation succeed together
    const sale = await prisma.$transaction(async (tx) => {
      // 1. Create sale
      const newSale = await tx.sale.create({
        data: {
          customerId: customerId || null,
          total,
          items: {
            create: cart.map((item: any) => ({
              productId: item.product.id,
              quantity: item.quantity,
              customization: item.customization ? JSON.stringify(item.customization) : null
            }))
          }
        }
      });

      // 2. Decrement stock for products and ingredients
      for (const item of cart) {
        if (!item.product.isIngredient && item.product.category !== "Acesso") {
          // Standard product (e.g. valid bottle of water, protein bar)
          await tx.product.update({
            where: { id: item.product.id },
            data: { stock: { decrement: item.quantity } }
          });
        }
        
        // 3. Handle complex customized "Acesso" (Combos)
        if (item.customization) {
          // Decrement milk (e.g., 250ml per shake)
          if (item.customization.milkType) {
            await tx.product.update({
              where: { id: item.customization.milkType.id },
              data: { stock: { decrement: 250 * item.quantity } }
            });
          }
          
          // Decrement flavors (e.g. 15g if two flavors, 30g if one flavor)
          const f1 = item.customization.flavor1;
          const f2 = item.customization.flavor2;
          
          if (f1 && f2) {
            await tx.product.update({
              where: { id: f1.id },
              data: { stock: { decrement: 15 * item.quantity } }
            });
            await tx.product.update({
              where: { id: f2.id },
              data: { stock: { decrement: 15 * item.quantity } }
            });
          } else if (f1) {
            await tx.product.update({
              where: { id: f1.id },
              data: { stock: { decrement: 30 * item.quantity } }
            });
          }
        }
      }

      return newSale;
    });

    return NextResponse.json(sale);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao processar venda' }, { status: 500 });
  }
}
