"use client";

import { useEffect, useState } from "react";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("すべて");

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch("/api/contracts");

        if (!response.ok) {
          throw new Error("契約の取得に失敗しました");
        }

        const data = await response.json();
        setContracts(data);
      } catch (error) {
        console.error("契約取得エラー:", error);
      }
    };

    fetchContracts();
  }, []);

  const filteredContracts = contracts.filter((contract) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      contract.contractCode
        .toLowerCase()
        .includes(keyword) ||
      contract.customer.name
        .toLowerCase()
        .includes(keyword) ||
      contract.property.name
        .toLowerCase()
        .includes(keyword);

    const matchesStatus =
      statusFilter === "すべて" ||
      contract.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>契約管理</h1>
          <p>登録されている契約を管理します。</p>
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
            window.location.href = "/contracts/new";
          }}
        >
          ＋ 新規契約登録
        </button>
      </div>

      <section className="properties-content">
        <div className="search-area">
          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="契約番号・顧客名・物件名を検索"
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
            <option value="すべて">すべての契約</option>
            <option value="契約中">契約中</option>
            <option value="完了">完了</option>
            <option value="キャンセル">キャンセル</option>
          </select>
        </div>

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
              statusFilter === "契約中" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("契約中")}
          >
            契約中
          </button>

          <button
            className={`property-tab ${
              statusFilter === "完了" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("完了")}
          >
            完了
          </button>

          <button
            className={`property-tab ${
              statusFilter === "キャンセル"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setStatusFilter("キャンセル")
            }
          >
            キャンセル
          </button>
        </div>

        <div className="properties-table">
          <div className="properties-table-header">
            <span>契約情報</span>
            <span>顧客</span>
            <span>物件</span>
            <span>契約金額</span>
            <span>契約日</span>
            <span>ステータス</span>
            <span></span>
          </div>

          {filteredContracts.length > 0 ? (
            filteredContracts.map((contract) => (
              <div
                className="properties-table-row"
                key={contract.id}
              >
                <div className="property-name">
                  <strong>
                    {contract.contractCode}
                  </strong>

                  <small>
                    契約ID：{contract.id}
                  </small>
                </div>

                <div>
                  {contract.customer.name}
                </div>

                <div>
                  {contract.property.name}
                </div>

                <div>
                  {contract.contractPrice}
                </div>

                <div>
                  {new Date(
                    contract.contractDate
                  ).toLocaleDateString("ja-JP")}
                </div>

                <div>
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

                <button
                  className="detail-button"
                  onClick={() => {
                    window.location.href = `/contracts/${contract.id}`;
                  }}
                >
                  詳細
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <strong>
                契約が見つかりませんでした
              </strong>

              <p>
                検索条件を変更して、もう一度お試しください。
              </p>
            </div>
          )}
        </div>

        <div className="properties-footer">
          <span>
            全 {filteredContracts.length} 件
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