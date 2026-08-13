import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    
    // For stock updates (delta), we might receive { action: "increment", amount: X } 
    // or we might receive a full product payload.
    if (data.action === "updateStock") {
      const product = await prisma.product.update({
        where: { id },
        data: { stock: { increment: data.amount } }
      });
      return NextResponse.json(product);
    }
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        price: data.price,
        stock: data.stock,
        unit: data.unit,
        avgConsumption: data.avgConsumption,
        isIngredient: data.isIngredient,
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar produto' }, { status: 500 });
  }
}
