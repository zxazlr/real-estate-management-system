"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  stats: {
    propertyCount: number;
    customerCount: number;
    contractCount: number;
    activeContractCount: number;
  };
  recentContracts: any[];
  recentProperties: any[];
  recentCustomers: any[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error(
            "Dashboard情報の取得に失敗しました"
          );
        }

        const dashboardData = await response.json();

        setData(dashboardData);
      } catch (error) {
        console.error("Dashboard取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-loading">
          Dashboardを読み込んでいます...
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-loading">
          Dashboard情報を取得できませんでした。
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            不動産管理システムの概要を確認できます。
          </p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            window.location.href = "/properties/new";
          }}
        >
          ＋ 新規物件登録
        </button>
      </div>

      <section className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            🏠
          </div>

          <div>
            <span>物件総数</span>
            <strong>
              {data.stats.propertyCount}
            </strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            👤
          </div>

          <div>
            <span>顧客総数</span>
            <strong>
              {data.stats.customerCount}
            </strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            📄
          </div>

          <div>
            <span>契約総数</span>
            <strong>
              {data.stats.contractCount}
            </strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            ✍️
          </div>

          <div>
            <span>契約中</span>
            <strong>
              {data.stats.activeContractCount}
            </strong>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h2>最近の契約</h2>
              <p>最近登録された契約です。</p>
            </div>

            <button
              className="text-button"
              onClick={() => {
                window.location.href = "/contracts";
              }}
            >
              すべて見る →
            </button>
          </div>

          {data.recentContracts.length > 0 ? (
            <div className="dashboard-list">
              {data.recentContracts.map(
                (contract) => (
                  <div
                    className="dashboard-list-item"
                    key={contract.id}
                  >
                    <div>
                      <strong>
                        {contract.contractCode}
                      </strong>

                      <span>
                        {contract.customer.name}
                      </span>

                      <small>
                        {contract.property.name}
                      </small>
                    </div>

                    <div className="dashboard-list-right">
                      <strong>
                        {contract.contractPrice}
                      </strong>

                      <span
                        className={`property-status ${
                          contract.status === "契約中"
                            ? "published"
                            : "contracted"
                        }`}
                      >
                        {contract.status}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="dashboard-empty">
              まだ契約がありません。
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h2>最近の物件</h2>
              <p>最近登録された物件です。</p>
            </div>

            <button
              className="text-button"
              onClick={() => {
                window.location.href = "/properties";
              }}
            >
              すべて見る →
            </button>
          </div>

          {data.recentProperties.length > 0 ? (
            <div className="dashboard-list">
              {data.recentProperties.map(
                (property) => (
                  <div
                    className="dashboard-list-item"
                    key={property.id}
                  >
                    <div>
                      <strong>
                        {property.name}
                      </strong>

                      <span>
                        {property.propertyCode}
                      </span>

                      <small>
                        {property.address}
                      </small>
                    </div>

                    <div className="dashboard-list-right">
                      <strong>
                        {property.price}
                      </strong>

                      <span
                        className={`property-status ${
                          property.status === "公開中"
                            ? "published"
                            : "contracted"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="dashboard-empty">
              まだ物件がありません。
            </div>
          )}
        </div>
      </section>

      <section className="dashboard-card">
        <div className="dashboard-card-header">
          <div>
            <h2>最近の顧客</h2>
            <p>最近登録された顧客です。</p>
          </div>

          <button
            className="text-button"
            onClick={() => {
              window.location.href = "/customers";
            }}
          >
            すべて見る →
          </button>
        </div>

        {data.recentCustomers.length > 0 ? (
          <div className="dashboard-customer-list">
            {data.recentCustomers.map(
              (customer) => (
                <div
                  className="dashboard-customer-item"
                  key={customer.id}
                >
                  <div className="customer-avatar">
                    {customer.name.charAt(0)}
                  </div>

                  <div>
                    <strong>
                      {customer.name}
                    </strong>

                    <span>
                      {customer.customerCode}
                    </span>
                  </div>

                  <div className="dashboard-customer-contact">
                    <span>
                      {customer.phone}
                    </span>

                    <small>
                      {customer.email || "メール未登録"}
                    </small>
                  </div>

                  <span
                    className={`property-status ${
                      customer.status === "対応中"
                        ? "published"
                        : "contracted"
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="dashboard-empty">
            まだ顧客がありません。
          </div>
        )}
      </section>
    </main>
  );
}