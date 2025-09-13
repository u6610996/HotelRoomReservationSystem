import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { filterRooms, type Filters, type Room } from "../logic/filterRooms";
import { validateDates } from "../logic/validateDates";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
    setFilters((s) => {
      const set = new Set(s.features ?? []);
      set.has(f) ? set.delete(f) : set.add(f);
      return { ...s, features: Array.from(set) };
    });

  return (
    <div className="container py-5">
      {/* Title */}
      <div className="mb-4">
        <h1 className="fw-bold">Find Your Room</h1>
        <p className="text-muted">Filter by date, type, price, availability, and features.</p>
      </div>

      {/* Filter Panel */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            {/* Dates */}
            <div className="col-md-3">
              <label className="form-label small">Check-in</label>
              <input
                type="date"
                className="form-control"
                value={filters.checkIn ?? ""}
                onChange={(e) =>
                  setFilters((s) => ({ ...s, checkIn: e.target.value }))
                }
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Check-out</label>
              <input
                type="date"
                className="form-control"
                value={filters.checkOut ?? ""}
                onChange={(e) =>
                  setFilters((s) => ({ ...s, checkOut: e.target.value }))
                }
              />
            </div>

            {/* Type */}
            <div className="col-md-3">
              <label className="form-label small">Room Type</label>
              <select
                className="form-select"
                value={filters.type ?? "ALL"}
                onChange={(e) =>
                  setFilters((s) => ({ ...s, type: e.target.value as any }))
                }
              >
                <option value="ALL">All</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </select>
            </div>

            {/* Sort */}
            <div className="col-md-3">
              <label className="form-label small">Sort</label>
              <select
                className="form-select"
                value={filters.sortBy ?? "price"}
                onChange={(e) =>
                  setFilters((s) => ({ ...s, sortBy: e.target.value as any }))
                }
              >
                <option value="price">Price ↑</option>
                <option value="popularity">Popularity ↓</option>
              </select>
            </div>

            {/* Price range */}
            <div className="col-md-6 d-flex gap-2">
              <div className="flex-fill">
                <label className="form-label small">Min (฿)</label>
                <input
                  type="number"
                  className="form-control"
                  value={filters.priceMin ?? 0}
                  onChange={(e) =>
                    setFilters((s) => ({ ...s, priceMin: +e.target.value }))
                  }
                />
              </div>
              <div className="flex-fill">
                <label className="form-label small">Max (฿)</label>
                <input
                  type="number"
                  className="form-control"
                  value={filters.priceMax ?? 10000}
                  onChange={(e) =>
                    setFilters((s) => ({ ...s, priceMax: +e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Features */}
            <div className="col-md-6">
              <label className="form-label small">Features</label>
              <div className="d-flex flex-wrap gap-2">
                {ALL_FEATURES.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`btn btn-sm ${
                      filters.features?.includes(f)
                        ? "btn-dark"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => toggleFeature(f)}
                  >
                    {f}
                  </button>
                ))}
                <div className="form-check ms-auto">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={!!filters.discountedOnly}
                    onChange={(e) =>
                      setFilters((s) => ({
                        ...s,
                        discountedOnly: e.target.checked,
                      }))
                    }
                  />
                  <label className="form-check-label small">
                    Discounted only
                  </label>
                </div>
              </div>
            </div>
          </div>

          {filters.checkIn && filters.checkOut && error && (
            <div className="alert alert-danger mt-3 small">{error}</div>
          )}
        </div>
      </div>

      {/* Summary */}
      <p className="text-muted small mb-3">
        Results: <strong>{results.length}</strong>
        {filters.checkIn && filters.checkOut && !error && (
          <> • {filters.checkIn} → {filters.checkOut}</>
        )}
        {filters.features?.length ? (
          <> • Features: {filters.features.join(", ")}</>
        ) : null}
      </p>

      {/* Results Grid - 2 cards per row */}
      <div className="row g-4">
        {results.length === 0 && (
          <div className="col-12">
            <div className="alert alert-secondary text-center">
              No rooms found
            </div>
          </div>
        )}

        {results.map((r) => (
          <div key={r.id} className="col-md-6">
            <Link
              to={`/rooms/${r.id}`}
              className="card h-100 shadow-sm text-decoration-none text-dark"
            >
              <img
                src={r.images?.[0] ?? "/images/placeholder.jpg"}
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
                alt={r.name}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{r.name}</h5>
                  <span className="badge bg-light text-dark border">
                    {r.type}
                  </span>
                </div>
                <p className="card-text text-muted mt-2 mb-0">
                  ฿{r.price.toLocaleString()}
                </p>
                {r.discount && (
                  <p className="text-success small mb-0">
                    −{Math.round(r.discount * 100)}%
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
