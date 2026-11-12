import Card from "./Card";

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <Card>
      <p className="text-center text-gray-400">{message}</p>
    </Card>
  );
}