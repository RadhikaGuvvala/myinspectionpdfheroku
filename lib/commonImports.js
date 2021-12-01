import chain from 'lodash/chain';
import debounce from 'lodash/debounce';
import groupBy from 'lodash/groupBy';
import sumBy from 'lodash/sumBy';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import Swal from 'sweetalert2';
//import withReactContent from 'sweetalert2-react-content';

/* Export Sweet Alerts with React Content Integration */
//export const customSweetAlert = withReactContent(Swal);

/* Export common types from 'prop-types */
export {
  any,
  array,
  arrayOf,
  bool,
  element,
  func,
  node,
  number,
  object,
  oneOf,
  oneOfType,
  shape,
  string
} from 'prop-types';
/* Export toast method from 'react-toastify */
export { toast as notifications, ToastContainer } from 'react-toastify';
/* Export uuid method from 'uuid */
export { v4 as uuid } from 'uuid';
/* Export only the utility methods used from lodash instead of importing directly from lodash */
export { chain, debounce, groupBy, sumBy, uniq, uniqBy };
