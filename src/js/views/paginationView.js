import View from './view';
import icons from 'url:../../img/icons.svg'


class PaginstionView extends View {
  _parentElement = document.querySelector('.pagination')


  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--inline')
      if(!btn) return

      const goToPage = +btn.dataset.goto
      console.log(goToPage)

      handler(goToPage)
    })
  }

  _generateMarkup() {

    const curPage=this._data.page
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
    console.log(numPages)

    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${curPage + 1}</span>
    </button>
    `
    }
  
    if (curPage === numPages && numPages > 1) {
      return `
          <button data-goto="${curPage -1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage -1}</span>
          </button>
          `
    }
    if (curPage < numPages) {
      return`
      <button data-goto="${curPage -1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage-1}</span>
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${curPage + 1}</span>
    </button>
   
  </button>
      
      `
    }

    return ''
  }
}
 
export default new PaginstionView