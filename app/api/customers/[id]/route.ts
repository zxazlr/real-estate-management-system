import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = Number(id);

    if (Number.isNaN(customerId)) {
      return NextResponse.json(
        { error: "無効な顧客IDです。" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "顧客が見つかりませんでした。" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("顧客詳細取得エラー:", error);

    return NextResponse.json(
      { error: "顧客の取得に失敗しました。" },
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
    const customerId = Number(id);

    if (Number.isNaN(customerId)) {
      return NextResponse.json(
        { error: "無効な顧客IDです。" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const customer = await prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        address: body.address || null,
        status: body.status || "対応中",
        notes: body.notes || null,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error("顧客更新エラー:", error);

    return NextResponse.json(
      { error: "顧客の更新に失敗しました。" },
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
    const customerId = Number(id);

    if (Number.isNaN(customerId)) {
      return NextResponse.json(
        { error: "無効な顧客IDです。" },
        { status: 400 }
      );
    }

    await prisma.customer.delete({
      where: {
        id: customerId,
      },
    });

    return NextResponse.json({
      message: "顧客を削除しました。",
    });
  } catch (error) {
    console.error("顧客削除エラー:", error);

    return NextResponse.json(
      { error: "顧客の削除に失敗しました。" },
      { status: 500 }
    );
  }
}