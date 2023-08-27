import { useState } from 'react';

function Homepage() {
  const [] = useState(0);

  return (
    <div className="container">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div style={{ width: '1200px', height: '500px', backgroundColor: 'gray' }}></div>
          </div>
          <div className="carousel-item">
            <div style={{ width: '1200px', height: '500px', backgroundColor: 'blue' }}></div>
          </div>
          <div className="carousel-item">
            <div style={{ width: '1200px', height: '500px', backgroundColor: 'green' }}></div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        <h1>OpenMedical</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra ligula nec neque tristique elementum. Proin nec neque eu erat dignissim sollicitudin. Fusce in bibendum augue, quis porttitor velit. Proin eget neque eu turpis sodales tincidunt. Sed quis libero id ligula ullamcorper vehicula vel et augue. Nulla dignissim maximus nisi. Praesent iaculis ligula interdum blandit fermentum. Maecenas egestas dui nec mi viverra accumsan. Donec non ullamcorper ligula, pretium bibendum enim. Praesent id erat magna. Morbi sit amet convallis ex. Vivamus iaculis ex ut lectus euismod imperdiet. Vestibulum sed sapien lobortis, sodales justo vitae, vestibulum enim. Morbi bibendum pharetra sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
        <p>Curabitur luctus magna risus, sed laoreet odio sodales ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent in sapien tempor, egestas nisi et, luctus ipsum. Mauris consectetur enim mollis ex fermentum scelerisque at at eros. Donec eget porta mauris, at aliquam orci. Cras eget facilisis magna, feugiat finibus est. Mauris feugiat sagittis semper. Pellentesque at elementum mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed scelerisque commodo lectus, faucibus convallis sapien ultrices in. Pellentesque id eleifend ex, et volutpat risus. In iaculis, justo eget placerat congue, sem elit finibus ex, vitae tempus ipsum odio quis turpis. Sed in iaculis enim, ac efficitur arcu.</p>
        <p>In quis neque pellentesque lacus facilisis efficitur. Nunc mattis sapien eu luctus congue. Pellentesque pharetra ornare orci. Aliquam et velit sit amet ipsum porta aliquet. Donec mattis non turpis sit amet rhoncus. Aliquam pretium consequat nisl, sit amet congue leo. Fusce a magna quis ante dictum pellentesque ut quis diam.</p>
        <p>Morbi et justo vel libero convallis accumsan vel ut lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris nec ultricies felis, ut egestas libero. Pellentesque tempor quis nisi vitae pellentesque. Nam eu efficitur odio, eget tincidunt diam. Nulla eget magna commodo, placerat sem eget, pharetra nulla. In ut diam nibh. Aliquam porttitor, ipsum id ornare luctus, urna tortor vehicula magna, sed pulvinar eros justo eget tellus. Proin congue sem ex, eu sollicitudin lacus imperdiet eu. Duis vel sagittis ipsum.</p>
        <p>Vestibulum nec ornare urna, eget consequat mauris. Praesent convallis elit vitae gravida blandit. Sed ac arcu vitae ligula sagittis vehicula sed in dolor. Nullam consectetur dui efficitur, tempus dui auctor, hendrerit diam. Praesent eleifend feugiat sem, ac volutpat odio dignissim at. Integer ultrices mi sed leo tincidunt aliquet. Fusce interdum, mauris vitae euismod consectetur, quam nisi faucibus erat, quis congue leo leo et nisi. Maecenas quis justo non est congue condimentum. Cras consequat tempus condimentum. Nullam imperdiet arcu quis volutpat consequat. Etiam vitae pharetra odio. Ut aliquet venenatis pellentesque.</p>
      </div>
    </div>
  );
}

export default Homepage;
