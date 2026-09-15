import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("顧客取得エラー:", error);

    return NextResponse.json(
      { error: "顧客の取得に失敗しました。" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const customer = await prisma.customer.create({
      data: {
        customerCode: `CU-${Date.now()}`,
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        address: body.address || null,
        status: body.status || "対応中",
        notes: body.notes || null,
      },
    });

    return NextResponse.json(customer, {
      status: 201,
    });
  } catch (error) {
    console.error("顧客登録エラー:", error);

    return NextResponse.json(
      { error: "顧客の登録に失敗しました。" },
      { status: 500 }
    );
  }
}