import { createBrowserHistory } from 'history';

const basename = process.env.PUBLIC_URL;
const browserHistory = createBrowserHistory({ basename });

export default browserHistory;
