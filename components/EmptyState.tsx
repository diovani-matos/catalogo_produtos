type EmptyStateProps = {
  visible: boolean;
};

export default function EmptyState({ visible }: EmptyStateProps) {
  return (
    <div className={`catalog-empty${visible ? " show" : ""}`}>
      <div className="empty-icon" aria-hidden="true">
        🔍
      </div>
      <h3>Nenhum produto encontrado</h3>
      <p>Tente outro termo ou categoria</p>
    </div>
  );
}
