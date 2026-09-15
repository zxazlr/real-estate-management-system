"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    price: "",
    type: "中古マンション",
    area: "",
    layout: "",
    year: "",
    managementFee: "",
    repairFee: "",
    status: "公開中",
    notes: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `/api/properties/${params.id}`
        );

        if (!response.ok) {
          throw new Error("物件の取得に失敗しました");
        }

        const data = await response.json();

        setForm({
          name: data.name || "",
          address: data.address || "",
          price: data.price || "",
          type: data.type || "中古マンション",
          area: data.area || "",
          layout: data.layout || "",
          year: data.year || "",
          managementFee: data.managementFee || "",
          repairFee: data.repairFee || "",
          status: data.status || "公開中",
          notes: data.notes || "",
        });
      } catch (error) {
        console.error("物件取得エラー:", error);
        alert("物件情報を取得できませんでした。");
        router.push("/properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id, router]);

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

    setSaving(true);

    try {
      const response = await fetch(
        `/api/properties/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "物件の更新に失敗しました"
        );
      }

      alert("物件情報を更新しました！");

      router.push(`/properties/${params.id}`);
    } catch (error) {
      console.error("物件更新エラー:", error);
      alert("物件の更新に失敗しました。");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="properties-page">
        <div className="properties-content">
          <p>読み込み中...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>物件情報を編集</h1>
          <p>登録されている物件情報を変更します。</p>
        </div>

        <button
          className="detail-button"
          onClick={() =>
            router.push(`/properties/${params.id}`)
          }
        >
          ← 詳細へ戻る
        </button>
      </div>

      <section className="new-property-content">
        <form
          className="property-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>物件名</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>所在地</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>価格</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>物件種別</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="新築マンション">
                新築マンション
              </option>
              <option value="中古マンション">
                中古マンション
              </option>
              <option value="新築戸建">
                新築戸建
              </option>
              <option value="中古戸建">
                中古戸建
              </option>
              <option value="土地">
                土地
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>専有面積</label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>間取り</label>
            <input
              name="layout"
              value={form.layout}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>築年</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>管理費</label>
            <input
              name="managementFee"
              value={form.managementFee}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>修繕積立金</label>
            <input
              name="repairFee"
              value={form.repairFee}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>ステータス</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="公開中">公開中</option>
              <option value="契約済み">契約済み</option>
            </select>
          </div>

          <div className="form-group">
            <label>備考</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="detail-button"
              onClick={() =>
                router.push(`/properties/${params.id}`)
              }
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="add-button"
              disabled={saving}
            >
              {saving ? "保存中..." : "変更を保存"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}