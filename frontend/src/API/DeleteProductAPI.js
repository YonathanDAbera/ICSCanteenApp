import { DELETE, GET } from "../utils/http";

async function deleteProductAPI(token, id, setProducts) {
  const deleteConfirmation = window.confirm(
    "The product will be removed from the database. Are you sure?"
  );

  if (deleteConfirmation) {
    try {
      const { response } = await DELETE(`/api/products/${id}`, token);

      if (response.status === 204) {
        const { json } = await GET("/api/products?page=1&limit=6", token);

        setProducts(json.data);
      }

      if (response.status === 403)
        return alert("Administrator role required");
    } catch (err) {
      console.log(err);
    }
  } else {
    return;
  }
}

export default deleteProductAPI;
