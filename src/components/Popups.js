import Swal from 'sweetalert2';

/**
 * @description - Popup
 * @param title
 * @param text
 * @param type
 * @returns {Promise<SweetAlertResult>}
 * @constructor
 */
export const EmptyCartPopup = (title, text, type) => {
    return Swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        cancelButtonText:'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!'
    })
};

/**
 *
 * @returns {Promise<SweetAlertResult>}
 * @constructor
 */
export const SucessEmptyCartPopup = () => {
    return Swal.fire(
        'Deleted!',
        'You cart is empty now.',
        'success'
    )
};

