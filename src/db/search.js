import db from "./db";

const search = data => db.filter(item => item.type === data.type);

export default search;