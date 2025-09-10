import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { filterRooms, type Filters, type Room } from "../logic/filterRooms";
import { validateDates } from "../logic/validateDates";

const ALL_FEATURES = ["WiFi", "Balcony", "Sea View"] as const;

export default function Search() {
  const [filters, setFilters] = useState<Filters>({
    type: "ALL",
    priceMin: 0,
    priceMax: 10000,
    discountedOnly: false,
    sortBy: "price",
  });

  const error = validateDates(filters.checkIn, filters.checkOut);
  const results = useMemo<Room[]>(
    () =>
      filters.checkIn && filters.checkOut && !error
        ? filterRooms(filters)
        : filterRooms({ ...filters, checkIn: undefined, checkOut: undefined }),
    [filters, error]
  );

  const toggleFeature = (f: string) =>
    setFilters(s => {
      const set = new Set(s.features ?? []);
      set.has(f) ? set.delete(f) : set.add(f);
      return { ...s, features: Array.from(set) };
    });

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Find your room</h1>
        <p className="text-gray-600">Filter by date, type, price, availability and features.</p>
      </div>

      {/* Filter Panel */}
      <div className="rounded-2xl border bg-white p-4 lg:p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Check-in</label>
            <input type="date" className="border rounded-lg px-3 py-2"
              value={filters.checkIn ?? ""} onChange={e=>setFilters(s=>({...s, checkIn:e.target.value}))}/>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Check-out</label>
            <input type="date" className="border rounded-lg px-3 py-2"
              value={filters.checkOut ?? ""} onChange={e=>setFilters(s=>({...s, checkOut:e.target.value}))}/>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Room type</label>
            <select className="border rounded-lg px-3 py-2"
              value={filters.type ?? "ALL"} onChange={e=>setFilters(s=>({...s, type: e.target.value as any}))}>
              <option value="ALL">All</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Sort</label>
            <select className="border rounded-lg px-3 py-2"
              value={filters.sortBy ?? "price"} onChange={e=>setFilters(s=>({...s, sortBy: e.target.value as any}))}>
              <option value="price">Price ↑</option>
              <option value="popularity">Popularity ↓</option>
            </select>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 w-20">Min (฿)</label>
              <input type="number" className="border rounded-lg px-3 py-2 w-full"
                value={filters.priceMin ?? 0} onChange={e=>setFilters(s=>({...s, priceMin:+e.target.value}))}/>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 w-20">Max (฿)</label>
              <input type="number" className="border rounded-lg px-3 py-2 w-full"
                value={filters.priceMax ?? 10000} onChange={e=>setFilters(s=>({...s, priceMax:+e.target.value}))}/>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500">Features:</span>
            {ALL_FEATURES.map(f => (
              <button key={f}
                className={`px-3 py-1 rounded-full border text-sm ${filters.features?.includes(f) ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"}`}
                onClick={()=>toggleFeature(f)} type="button">{f}</button>
            ))}
            <label className="ml-auto flex items-center gap-2">
              <input type="checkbox" checked={!!filters.discountedOnly}
                onChange={e=>setFilters(s=>({...s, discountedOnly:e.target.checked}))}/>
              <span className="text-sm">Discounted only</span>
            </label>
          </div>
        </div>

        {filters.checkIn && filters.checkOut && error && (
          <div className="mt-3 p-3 rounded-lg border border-red-300 bg-red-50 text-sm text-red-700">{error}</div>
        )}
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-600">
        Results: <strong>{results.length}</strong>
        {filters.checkIn && filters.checkOut && !error && <> • {filters.checkIn} → {filters.checkOut}</>}
        {filters.features?.length ? <> • Features: {filters.features.join(", ")}</> : null}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.length === 0 && (
          <div className="p-6 border rounded-2xl bg-white text-center text-gray-500 col-span-full">No rooms found</div>
        )}

        {results.map(r => (
          <Link to={`/rooms/${r.id}`} key={r.id}
            className="block rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-md transition-shadow">
            <div className="img-frame">
              <img className="img-cover" src={r.images?.[0] ?? "/images/placeholder.jpg"} alt={r.name} />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium">{r.name}</h3>
                <span className="px-2 py-1 rounded-lg bg-gray-100 text-xs">{r.type}</span>
              </div>
              <div className="mt-1 text-sm text-gray-600 flex items-center justify-between">
                <span>฿{r.price.toLocaleString()}/คืน</span>
                {r.discount ? <span className="text-green-600">−{Math.round(r.discount * 100)}%</span> : <span />}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
