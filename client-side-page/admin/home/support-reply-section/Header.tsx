export const Header = () => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-medium leading-tight">Support replies</h2>
      <p className="text-sm text-muted-foreground">
        Conversations where the latest message came from the user.
      </p>
    </div>
  );
}