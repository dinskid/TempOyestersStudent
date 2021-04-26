const params = window.location.href;
const url = new URL(params);
const id = url.searchParams.get('tutor_id');

export default id;
