const SKELETON_COUNT = 6;

export default function SkeletonGrid() {
  return (
    <div className="product-grid" aria-hidden="true">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div key={i} className="skel-card">
          <div className="skel-img skeleton" />
          <div className="skel-body">
            <div className="skeleton" style={{ height: 10, width: "40%" }} />
            <div className="skeleton" style={{ height: 13, width: "80%" }} />
            <div className="skeleton" style={{ height: 11 }} />
            <div className="skeleton" style={{ height: 11, width: "60%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
