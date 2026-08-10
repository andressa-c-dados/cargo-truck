interface SummaryCardProps {
  title: string;
  value: number;
}

export default function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <div className="summary-card">
      <h3 className="card-title">
        {title}
      </h3>
      <p className="card-value">
        {value}
      </p>
    </div>
  );
}