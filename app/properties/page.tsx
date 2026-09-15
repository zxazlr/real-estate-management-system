"use client";

import { useEffect, useState } from "react";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("すべて");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");

        if (!response.ok) {
          throw new Error("物件の取得に失敗しました");
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("物件取得エラー:", error);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      property.name.toLowerCase().includes(keyword) ||
      property.address.toLowerCase().includes(keyword) ||
      property.propertyCode.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "すべて" ||
      property.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>物件管理</h1>
          <p>登録されている物件を管理します。</p>
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
            window.location.href = "/properties/new";
        }}
        >
        ＋ 新規物件登録
        </button>
      </div>

      <section className="properties-content">
        {/* 搜索区域 */}
        <div className="search-area">
          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="物件名・住所・物件番号を検索"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="すべて">すべての物件</option>
            <option value="公開中">公開中</option>
            <option value="契約済み">契約済み</option>
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
              statusFilter === "公開中" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("公開中")}
          >
            公開中
          </button>

          <button
            className={`property-tab ${
              statusFilter === "契約済み" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("契約済み")}
          >
            契約済み
          </button>
        </div>

        {/* 物件列表 */}
        <div className="properties-table">
          <div className="properties-table-header">
            <span>物件情報</span>
            <span>所在地</span>
            <span>価格</span>
            <span>物件種別</span>
            <span>ステータス</span>
            <span></span>
          </div>

          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                className="properties-table-row"
                key={property.id}
              >
                <div className="property-name">
                  <strong>{property.name}</strong>
                  <small>{property.propertyCode}</small>
                </div>

                <div>{property.address}</div>

                <div className="property-price">
                  {property.price}
                </div>

                <div>{property.type}</div>

                <div>
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

                <button
                className="detail-button"
                onClick={() => {
                    window.location.href = `/properties/${property.id}`;
                }}
                >
                詳細
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <strong>物件が見つかりませんでした</strong>
              <p>
                検索条件を変更して、もう一度お試しください。
              </p>
            </div>
          )}
        </div>

        {/* 底部 */}
        <div className="properties-footer">
          <span>
            全 {filteredProperties.length} 件
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

