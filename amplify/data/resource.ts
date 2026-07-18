import { a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    List: a
        .model({
            name: a.string().required(),
            items: a.hasMany("Item", "listId"),
        })
        .authorization((allow) => [
            allow.owner(),
        ]),

    Item: a
        .model({
            title: a.string().required(),
            completed: a.boolean().required(),
            listId: a.id(),
            list: a.belongsTo("List", "listId"),
        })
        .authorization((allow) => [
            allow.owner(),
        ]),
});

export const data = defineData({
    schema,
});
