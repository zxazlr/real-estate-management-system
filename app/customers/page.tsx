"use client";

import { useEffect, useState } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("すべて");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers");

        if (!response.ok) {
          throw new Error("顧客の取得に失敗しました");
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("顧客取得エラー:", error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      customer.name.toLowerCase().includes(keyword) ||
      customer.phone.toLowerCase().includes(keyword) ||
      customer.customerCode.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "すべて" ||
      customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>顧客管理</h1>
          <p>登録されている顧客を管理します。</p>
        </div>
        <button
        className="detail-button"
        onClick={() => {
            window.location.href = "/";
        }}
        >
        ← Dashboard
        </button>
        <button
          className="add-button"
          onClick={() => {
            window.location.href = "/customers/new";
          }}
        >
          ＋ 新規顧客登録
        </button>
      </div>

      <section className="properties-content">
        {/* 搜索区域 */}
        <div className="search-area">
          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="顧客名・電話番号・顧客番号を検索"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="すべて">すべての顧客</option>
            <option value="対応中">対応中</option>
            <option value="成約">成約</option>
            <option value="終了">終了</option>
          </select>
        </div>

        {/* 状态 Tab */}
        <div className="property-tabs">
          <button
            className={`property-tab ${
              statusFilter === "すべて" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("すべて")}
          >
            すべて
          </button>

          <button
            className={`property-tab ${
              statusFilter === "対応中" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("対応中")}
          >
            対応中
          </button>

          <button
            className={`property-tab ${
              statusFilter === "成約" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("成約")}
          >
            成約
          </button>

          <button
            className={`property-tab ${
              statusFilter === "終了" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("終了")}
          >
            終了
          </button>
        </div>

        {/* 顧客列表 */}
        <div className="properties-table">
          <div className="properties-table-header">
            <span>顧客情報</span>
            <span>電話番号</span>
            <span>メール</span>
            <span>ステータス</span>
            <span></span>
          </div>

          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div
                className="properties-table-row"
                key={customer.id}
              >
                <div className="property-name">
                  <strong>{customer.name}</strong>
                  <small>{customer.customerCode}</small>
                </div>

                <div>{customer.phone}</div>

                <div>
                  {customer.email || "未登録"}
                </div>

                <div>
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

                <button
                  className="detail-button"
                  onClick={() => {
                    window.location.href = `/customers/${customer.id}`;
                  }}
                >
                  詳細
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <strong>
                顧客が見つかりませんでした
              </strong>

              <p>
                検索条件を変更して、もう一度お試しください。
              </p>
            </div>
          )}
        </div>

        <div className="properties-footer">
          <span>
            全 {filteredCustomers.length} 件
          </span>

          <div className="pagination">
            <button disabled>‹</button>
            <button className="current">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      </section>
    </main>
  );
}