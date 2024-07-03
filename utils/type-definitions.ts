export interface RickAndMortyUser {
  id: string;
  username: string;
}

export enum TableViews {
  Characters = "characters",
  Locations = "locations",
  Episodes = "episodes",
}

export interface TableProps {
  data: any;
  pageCallback: (page: number) => void;
  showDetailCallback: (item: any) => void;
}

export interface SearchBarProps {
  handleSearchCallback: (input: string) => void;
  searchQuery: string;
}

export interface PopUpProps {
  message: string;
  setMessage?: (value: string | undefined) => void;
  isError: boolean;
  isChecker?: boolean;
  callback?: () => void;
  hasLogout?: boolean;
  isClosable?: boolean;
}

export interface DetailViewProps {
  data: any;
  searchCallback: (query: string) => void;
  tableViewCallback: (view: TableViews, query: string) => void;
  setIsDetailView: (value: boolean) => void;
}

export interface ButtonProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "ghost" | "danger";
  label: string;
  className?: string;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (value?: any) => void;
}
