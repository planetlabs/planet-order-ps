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
[Scenes Explorer](https://www.planet.com/scenes)).

If your order contains `analytic` scenes, you may (optionally) provide
a curves file in Photoshop `.acv` format which will be applied to all
analytic scenes in the order.

If your order contains both `analytic` and `visual` scenes, the `analytic` version will be used. If neither is available, the script will fail.

Once the script is done, it will produce a Photoshop document (16 bit per channel) as large as the bounding box of all scenes contained in the order. Each scene will be placed in its appropriate position within the bounding box.

## Projection

Scenes downloaded in a Planet Labs order are projected in WSG 84 / UTM. The scenes are not reprojected during the process.

## Limitations

### Mixed UTM zones
If there are scenes in the order that belong to different UTM zones the script will fail while trying to generate a file that is too large, or produce misaligned scenes.

### Maximum number of scenes
The script has been tested in Photoshop CC with a maximum of 10 scenes. It will likely work with more, but will be limited by the resources available on the system it's running on.

## License

© 2015 Planet Labs, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
