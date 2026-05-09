export const Header = () => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-medium leading-tight">
        Latest Chat from Customer
      </h2>
      <p className="text-sm text-muted-foreground">
        Recent customer messages across all conversations.
      </p>
    </div>
  );
}