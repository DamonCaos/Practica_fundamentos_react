import advertsReducer, { deleteAdvert } from "../advertsSlice";

describe("advertsSlice - Reducer tests", () => {
  it("should remove an advert when deleteAdvert.fulfilled is dispatched", () => {
    const initialState = {
      adverts: [
        { id: "1", name: "Test Advert", price: 100, photo: "", tags: [], sale: true }
      ],
      status: "idle" as "idle", // 🟢 Corrección: Especificar tipo correcto
      error: null,
    };

    const action = deleteAdvert.fulfilled("1", "", "1");
    const newState = advertsReducer(initialState, action);

    expect(newState.adverts).toHaveLength(0);
  });
});
