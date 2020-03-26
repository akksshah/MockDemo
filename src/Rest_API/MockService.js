export const FormService = {
    postRequest: async data => {
        const response = await fetch("http://www.mocky.io/v2/566061f21200008e3aabd919", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    },
};