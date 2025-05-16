// src/withRouter.js
import { useParams } from 'react-router-dom';

export function withRouter(Component) {
  return props => {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
}
