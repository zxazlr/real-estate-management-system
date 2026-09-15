
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);

    if (Number.isNaN(propertyId)) {
      return NextResponse.json(
        { error: "無効な物件IDです。" },
        { status: 400 }
      );
    }

const property = await prisma.property.findUnique({
  where: { id: propertyId },
  include: {
    contracts: {
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
      },
    },
  },
});

    if (!property) {
      return NextResponse.json(
        { error: "物件が見つかりませんでした。" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("物件詳細取得エラー:", error);

    return NextResponse.json(
      { error: "物件の取得に失敗しました。" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);

    if (Number.isNaN(propertyId)) {
      return NextResponse.json(
        { error: "無効な物件IDです。" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const property = await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        name: body.name,
        address: body.address,
        price: body.price,
        type: body.type,
        area: body.area || null,
        layout: body.layout || null,
        year: body.year || null,
        managementFee: body.managementFee || null,
        repairFee: body.repairFee || null,
        status: body.status || "公開中",
        notes: body.notes || null,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("物件更新エラー:", error);

    return NextResponse.json(
      { error: "物件の更新に失敗しました。" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);

    if (Number.isNaN(propertyId)) {
      return NextResponse.json(
        { error: "無効な物件IDです。" },
        { status: 400 }
      );
    }

    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });

    return NextResponse.json({
      message: "物件を削除しました。",
    });
  } catch (error) {
    console.error("物件削除エラー:", error);

    return NextResponse.json(
      { error: "物件の削除に失敗しました。" },
      { status: 500 }
    );
  }
}

