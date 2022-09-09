const Clickable: React.FC<ClickableProps> = ({ onClick, children }) => (
  <button
    data-testid="app-clickable"
    className="clickable"
    type="button"
    onClick={onClick}
    aria-label="clickable"
  >
    {children}
  </button>
);

export default Clickable;
