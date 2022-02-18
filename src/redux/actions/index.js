export const addPerson = (payload) => {
    return {
        type: "ADD",
        payload,
    };
};
export const deletePerson = (id) => {
    return {
        type: "DELETE",
        payload: id,
    };
};
