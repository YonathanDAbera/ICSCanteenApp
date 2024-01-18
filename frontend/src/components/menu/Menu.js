import styled from "styled-components";
import { withError } from "./../withError";
import { LoaderSpinner } from "./../LoaderSpinner";
import ProductsSectionSkeleton from "../ProductsSectionSkeleton";
import useMenu from "../../hooks/useMenu";
import SearchBar from "../MenuSearchBar";
import SortProductsOptions from "../SortProductsOptions";
import FilterCategoryOptions from "../FilterCategoryOptions";
import PaginationButtons from "../PaginationButtons";
import ProductsSectionComponent from "./ProductsSection";
import SectionTitle from "../SectionTitle";
const StyledMenu = styled.main`
  min-height: 100vh;
  width: 100vw;
  padding: 58px 0;
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
`;

const MenuWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-bottom: 20px;
  width: 100%;
  & > ${LoaderSpinner} {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 500;
    margin: -60px 0 0 -60px;
  }
`;
const SearchBarWrapper = styled.div`
  width: 100vw;
  margin: 30px auto 40px;
`;
export const ProductsSection = styled.div`
  &:before {
    display: ${(props) => (props.isLoading ? "block" : "none")};
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff57;
    z-index: 400;
  }
  width: 100%;
  gap: 30px;
  display: grid;
  padding: 0 15px 30px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;
`;
export const NotFoundMessage = styled.h4`
  margin-top: 20px;
  display: block;
  width: 100%;
`;

const FiltersBoard = styled.div`
  flex-wrap: wrap;
  margin: 0 15px 20px;
  display: flex;
  align-items: center;
  max-width: max-content;
  & > select {
    margin: 0 10px 10px 0;
  }
`;

function Menu() {
  const {
    isLoading,
    maxPage,
    products,
    populatedCategories,
    sorting,
    page,
    setPage,
    setCategory,
    setSorting,
    setTitle,
    isFirstRender,
    category,
    title,
  } = useMenu();

  return (
    <StyledMenu>
      <SectionTitle>Menu</SectionTitle>

      <SearchBarWrapper>
        <SearchBar setSearch={setTitle} defaultValue={title} />
      </SearchBarWrapper>
      <MenuWrapper>
        <FiltersBoard>
          <FilterCategoryOptions
            defaultValue={category}
            categories={populatedCategories}
            setCategoryPreferece={setCategory}
          />
          <SortProductsOptions
            defaultValue={sorting}
            setSortPreferece={setSorting}
            sortPreference={sorting}
          />
        </FiltersBoard>

        {isLoading && <LoaderSpinner />}

        {isLoading && isFirstRender ? (
          <ProductsSectionSkeleton />
        ) : (
          <ProductsSectionComponent isLoading={isLoading} products={products} />
        )}
      </MenuWrapper>

      <PaginationButtons setPage={setPage} page={page} maxPage={maxPage} />
    </StyledMenu>
  );
}

export default withError(Menu);
