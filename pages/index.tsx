import s from "./home.module.scss";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client";
import { RickAndMortyUser, TableViews } from "../utils/type-definitions";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useLazyQuery } from "@apollo/client";
import { queries } from "../utils/graphql";
import Link from "next/link";

const DynamicTable = dynamic(() => import("./components/Table"));
const DynamicViewSwitch = dynamic(() => import("./components/ViewSwitch"));
const DynamicSearchBar = dynamic(() => import("./components/SearchBar"));
const DynamicButton = dynamic(() => import("./components/Button"));
const DynamicPopUp = dynamic(() => import("./components/PopUp"));
const DynamicLoaderComponent = dynamic(() => import("./components/Loader"));
const DynamicDetailView = dynamic(() => import("./components/DetailView"));

const Home = () => {
  const [userId, setUserId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeView, setActiveView] = useState<TableViews>(
    TableViews.Characters
  );
  const [activeQuery, setActiveQuery] = useState(queries[activeView]);
  const [dataDetail, setDataDetail] = useState();
  const [isDetailView, setIsDetailView] = useState<boolean>(false);

  const { user } = useUser();

  const [getData, { data, error, loading }] = useLazyQuery(activeQuery);

  const appUser = user?.appUser as RickAndMortyUser;

  const dataCallback = (query: string, page: number) => {
    getData({ variables: { name: query, page } });
  };

  const tableViewCallback = (view: TableViews, query?: string) => {
    setActiveView(view);
    setActiveQuery(queries[view]);
    dataCallback(query ?? searchQuery, 1);
  };

  const pageCallback = (page: number) => {
    dataCallback(searchQuery, page);
  };

  const searchCallback = (query: string) => {
    setSearchQuery(query);
  };

  const showDetailCallback = (item: any) => {
    setDataDetail(item);
    setIsDetailView(true);
  };

  useEffect(() => {
    if (appUser) {
      setUserId(appUser.id);
    }
  }, [appUser]);

  if (!appUser || userId.length === 0) return null;

  if (error) return <DynamicPopUp message={error?.message} isError={true} />;

  if (isDetailView)
    return (
      <DynamicDetailView
        data={dataDetail}
        searchCallback={searchCallback}
        tableViewCallback={tableViewCallback}
        setIsDetailView={setIsDetailView}
      />
    );

  return (
    <div className={s.homePage}>
      <div className={s.headingContainer}>
        <DynamicViewSwitch
          headings={[
            TableViews.Characters,
            TableViews.Episodes,
            TableViews.Locations,
          ]}
          activeView={activeView}
          viewSwitchCallback={tableViewCallback}
        />
        <DynamicSearchBar
          handleSearchCallback={searchCallback}
          searchQuery={searchQuery}
        />
        <DynamicButton
          label={"Squanch"}
          onClick={() => {
            dataCallback(searchQuery, 1);
          }}
        />
        <Link href="/api/auth/logout" className={s.logout}>
          Log Out
        </Link>
      </div>
      {loading && <DynamicLoaderComponent />}
      {!data && !loading && (
        <div className={s.intro}>
          <p>Hello, {appUser?.username}!</p>
          <p>Welcome to the Rick & Morty Api Explorer!</p>
          <p>Click Squanch to fetch some results!</p>
        </div>
      )}
      {data && !loading && (
        <DynamicTable
          pageCallback={pageCallback}
          data={data[activeView]}
          showDetailCallback={showDetailCallback}
        />
      )}
    </div>
  );
};

export default withPageAuthRequired(Home);
