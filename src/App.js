import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Slider from '@material-ui/lab/Slider';
import Cropper from 'react-easy-crop';
import { getOrientation } from 'get-orientation/browser';
import getCroppedImg from './cropImage';
import './App.css';
import { Button } from '@material-ui/core';
import ImgDialog from './ImgDialog';

class App extends React.Component {
  state = {
    imageSrc: null,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4 / 3,
    croppedAreaPixels: null,
    croppedImage: null,
    isCropping: false,
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    this.setState({
      croppedAreaPixels,
    });
  };

  onZoomChange = (zoom) => {
    this.setState({ zoom });
  };

  showResult = async () => {
    try {
      this.setState({
        isCropping: true,
      });
      const croppedImage = await getCroppedImg(
        this.state.imageSrc,
        this.state.croppedAreaPixels
      );
      console.log('done', { croppedImage });
      this.setState({
        croppedImage,
        isCropping: false,
      });
    } catch (e) {
      console.error(e);
      this.setState({
        isCropping: false,
      });
    }
  };

  onClose = async () => {
    this.setState({
      croppedImage: null,
    });
  };

  onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // code for check the file size
      const size = file.size / 1024;
      if (size < 1024) {
        alert('File too small, please select a new file and try again');
      } else if (size >= 1024) {
        let imageDataUrl = await readFile(file);

        this.setState({
          imageSrc: imageDataUrl,
          crop: { x: 0, y: 0 },
          zoom: 1,
        });
      }
    }
  };

  render() {
    return (
      <div className='App'>
        <input type='file' onChange={this.onFileChange} />
        {this.state.imageSrc && (
          <Fragment>
            <div className='crop-container'>
              <Cropper
                image={this.state.imageSrc}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
              />
            </div>
            <br />
            <div className='controls'>
              <Slider
                value={this.state.zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e, zoom) => this.onZoomChange(zoom)}
                classes={{ container: 'slider' }}
              />
            </div>
            <div className='crop-container'>
              <Cropper
                image={this.state.imageSrc}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
              />
            </div>
            <br />
            <div className='controls'>
              <Slider
                value={this.state.zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e, zoom) => this.onZoomChange(zoom)}
                classes={{ container: 'slider' }}
              />
            </div>
            <div className='crop-container'>
              <Cropper
                image={this.state.imageSrc}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
              />
            </div>
            <br />
            <div className='controls'>
              <Slider
                value={this.state.zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e, zoom) => this.onZoomChange(zoom)}
                classes={{ container: 'slider' }}
              />
            </div>
            <div className='crop-container'>
              <Cropper
                image={this.state.imageSrc}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
              />
            </div>
            <br />
            <div className='controls'>
              <Slider
                value={this.state.zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e, zoom) => this.onZoomChange(zoom)}
                classes={{ container: 'slider' }}
              />
            </div>
            <div className='button'>
              <Button
                color='primary'
                variant='contained'
                onClick={this.showResult}
                disabled={this.state.isCropping}
              >
                Show result
              </Button>
            </div>
            <ImgDialog img={this.state.croppedImage} onClose={this.onClose} />
          </Fragment>
        )}
      </div>
    );
  }
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default App;
