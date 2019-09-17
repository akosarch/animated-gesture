# Animated gesture
This Framer X component renders the animated gesture on the screen. It supports `tap` , `drag` and `swipe` gestures so far. Simple as it sounds 😜

If you like the component and want to contribute or leave feedback hit me via [FACEBOOK](https://www.facebook.com/anton.kosarchyn), [SPECTRUM](https://spectrum.chat/users/anton-kosarchyn) or  [GITHUB](https://github.com/akosarch/animated-gesture)

### How is it useful?

In case when you record the video of your mobile app prototype and want to hide the default cursor. Or you want your dribbble shot to look modern and professional. Come on! 

### How to use

1. Drag the component to the canvas. 
2. Connect the children frames to the component. You can connect multiple frames. 
3. Adjust parameters like `size`, `color`, `opacity` and others.
4. Profit! 😁

### Props

| Property       | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `Size`         | Size of the pointer in pixels. `32` by default               |
| `Color`        | Color of the gesture. `white` by default                     |
| `Opacity`      | Opacity of the gesture. `0.4` by default                     |
| `Min velocity` | Minimum drag velocity when `direction lock` occurs. `350` by default |
| `Max velocity` | Maximum drag velocity at which the pointer will have the maximum length. `700` by default |
| `Max scale`    | Maximum scale of the pointer when max drag velocity reached. `2` by default |
| `Content`      | The connected frames on top of which you want the gesture to be rendered |

### Known issues

If you connect frames linked with a Link tool, after transition occures it's no longer possible to use gesture. Solution: wrap each frame in separate gesture component and then link the components together. I'm working on a solution.