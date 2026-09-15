import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      propertyCount,
      customerCount,
      contractCount,
      activeContractCount,
      recentContracts,
      recentProperties,
      recentCustomers,
    ] = await Promise.all([
      prisma.property.count(),

      prisma.customer.count(),

      prisma.contract.count(),

      prisma.contract.count({
        where: {
          status: "契約中",
        },
      }),

      prisma.contract.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        include: {
          customer: true,
          property: true,
        },
      }),

      prisma.property.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),

      prisma.customer.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      stats: {
        propertyCount,
        customerCount,
        contractCount,
        activeContractCount,
      },
      recentContracts,
      recentProperties,
      recentCustomers,
    });
  } catch (error) {
    console.error("Dashboard取得エラー:", error);

    return NextResponse.json(
      { error: "Dashboard情報の取得に失敗しました。" },
      { status: 500 }
    );
  }
}