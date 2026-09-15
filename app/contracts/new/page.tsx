"use client";

import { useEffect, useState } from "react";

export default function NewContractPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    customerId: "",
    propertyId: "",
    contractPrice: "",
    contractDate: "",
    status: "契約中",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersResponse, propertiesResponse] =
          await Promise.all([
            fetch("/api/customers"),
            fetch("/api/properties"),
          ]);

        if (!customersResponse.ok) {
          throw new Error("顧客の取得に失敗しました");
        }

        if (!propertiesResponse.ok) {
          throw new Error("物件の取得に失敗しました");
        }

        const customersData = await customersResponse.json();
        const propertiesData = await propertiesResponse.json();

        setCustomers(customersData);
        setProperties(propertiesData);
      } catch (error) {
        console.error("契約登録用データ取得エラー:", error);
        alert("顧客・物件情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/contracts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "契約の登録に失敗しました"
        );
      }

      alert("契約を登録しました！");

      window.location.href = "/contracts";
    } catch (error) {
      console.error("契約登録エラー:", error);
      alert("契約の登録に失敗しました。");
    }
  };

  if (loading) {
    return (
      <main className="properties-page">
        <div className="properties-content">
          <p>顧客・物件情報を読み込んでいます...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>新規契約登録</h1>
          <p>新しい契約情報を登録します。</p>
        </div>

        <button
          className="detail-button"
          onClick={() => {
            window.location.href = "/contracts";
          }}
        >
          ← 契約一覧へ戻る
        </button>
      </div>

      <section className="new-property-content">
        <form
          className="property-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>顧客</label>

            <select
              name="customerId"
              value={form.customerId}
              onChange={handleChange}
              required
            >
              <option value="">
                顧客を選択してください
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name}（
                  {customer.customerCode}
                  ）
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>物件</label>

            <select
              name="propertyId"
              value={form.propertyId}
              onChange={handleChange}
              required
            >
              <option value="">
                物件を選択してください
              </option>

              {properties.map((property) => (
                <option
                  key={property.id}
                  value={property.id}
                >
                  {property.name}（
                  {property.propertyCode}
                  ）
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>契約金額</label>

            <input
              name="contractPrice"
              value={form.contractPrice}
              onChange={handleChange}
              placeholder="例：4,280万円"
              required
            />
          </div>

          <div className="form-group">
            <label>契約日</label>

            <input
              type="date"
              name="contractDate"
              value={form.contractDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>ステータス</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="契約中">契約中</option>
              <option value="完了">完了</option>
              <option value="キャンセル">
                キャンセル
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>備考</label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={5}
              placeholder="契約に関するメモ"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="detail-button"
              onClick={() => {
                window.location.href = "/contracts";
              }}
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="add-button"
            >
              契約を登録
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}