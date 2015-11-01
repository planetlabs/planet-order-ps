# planet-order-ps
Open a downloaded Planet order in Photoshop. Each scene in the order will be
correctly placed relatively to each other, each in a separate layer.

## Installation
To install the script copy the `Load Planet Order.jsx` file in your Photoshop
scripts directory.
  * Windows: C:\Program Files\Adobe\Photoshop [version]\Presets\Scripts
  * Mac OS X: Applications/Photoshop [version]/Presets/Scripts

## Usage
When the script is installed it will provide a menu item under `file > scripts`
Selecting the menu item will prompt you to select a directory containing an
unzipped Planet order. (Orders can be generated using the
[Scenes Explorer](https://www.planet.com/scenes))
If your order contains `analytic` scenes, you may (optionally) provide
a curves file in Photoshop `.acv` format which will be applied to all
analytic scenes in the order.
Once the script is done, it will produce a 16bit file as large as the
bounding box of all scenes contained in the order. Each scene will be
placed in its appropriate position within the bounding box.

### License

© Planet Labs, Inc.

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0) (the "License"); you may not use this file except in compliance with the License.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See [the License](http://www.apache.org/licenses/LICENSE-2.0) for the specific language governing permissions and limitations under the License.
