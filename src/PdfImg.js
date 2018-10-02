import React from 'react';
import PdfJs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';


const styles = {
  pdfImg: css`
    overflow: hidden;
  `,
};


class PdfImg extends React.Component {

  static defaultProps = {
    page: '1',
  }

  static propTypes = {
    page: PropTypes.string,
    src: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this._renderPdf();
  }

  componentDidUpdate() {
    this._renderPdf();
  }

  render() {
    const { className, src, page, ...rest } = this.props;
    return (
      <div
        {...rest}
        className={cx(styles.pdfImg, className)}
        ref={(container) => this.container = container}>
        <canvas ref={(canvas) => this.canvas = canvas} />
      </div>
    )
  }

  _renderPdf() {
    const { src, page: pageNumber } = this.props;
    const { width, height } = this.container.getBoundingClientRect();

    PdfJs.getDocument(src)
      .then((pdf) => {
        return pdf.getPage(parseInt(pageNumber));
      })
      .then((page) => {
        const naturalViewport = page.getViewport(1);

        const scale = width / naturalViewport.width;
        const viewport = page.getViewport(scale);

        this.canvas.height = viewport.height;
        this.canvas.width = viewport.width;

        const canvasContext = this.canvas.getContext('2d');
        page.render({ canvasContext, viewport });
      });
  }

}


export default PdfImg;
