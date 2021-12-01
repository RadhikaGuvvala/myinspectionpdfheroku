export function loaderHide() {
  if (document.getElementById('custom-loader'))
    document
      .getElementById('custom-loader')
      .setAttribute('style', 'display: none');
}

export function loaderShow() {
  if (document.getElementById('custom-loader'))
    document
      .getElementById('custom-loader')
      .setAttribute('style', 'display: block');
}
