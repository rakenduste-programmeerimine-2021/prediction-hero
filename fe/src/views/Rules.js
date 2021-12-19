import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function Rules() {
    
    return (
        <div style={styles.root}>
                    
                    <Typography variant="h2">Reeglid</Typography>
                    <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae quam sem. Duis felis massa, viverra vitae nulla nec, elementum luctus urna. Integer quis convallis nibh. Etiam vel magna ac eros euismod varius vitae ac augue. Nulla elementum nibh sit amet tristique imperdiet. Proin auctor libero non libero maximus lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus varius scelerisque odio sit amet vehicula.</Typography>

                    <Typography variant="body1">Duis auctor maximus tortor id consectetur. Praesent molestie sagittis purus. Praesent scelerisque sed tortor et aliquam. Nulla in sapien risus. Cras ut est massa. Cras ultrices elit sit amet maximus malesuada. Pellentesque pretium id urna at accumsan. Vestibulum condimentum, nunc sit amet mollis ornare, leo enim scelerisque lectus, et suscipit mauris ex quis nibh. Nam efficitur aliquet semper.</Typography>

                    <Typography variant="body1">Nunc dictum maximus purus, at gravida magna tempus quis. Integer efficitur tincidunt erat, a aliquam purus dignissim ac. Proin viverra convallis tellus, luctus aliquet velit consectetur at. Nunc nunc purus, placerat in elit nec, aliquet fermentum nisi. Sed dictum diam pharetra, tempor justo eget, laoreet mauris. Praesent molestie vehicula quam, sed tempor neque convallis lobortis. Mauris vulputate volutpat ex, nec condimentum elit tempus id. Curabitur lacinia massa vitae dictum luctus. Morbi libero lacus, ornare id iaculis in, ullamcorper consectetur odio.</Typography>

                    <Typography variant="body1">Morbi at facilisis massa. Etiam sit amet odio sit amet ipsum consequat aliquet sit amet id enim. Sed at sagittis erat. Suspendisse aliquam arcu quis dui tempus, sit amet cursus ante feugiat. Duis vitae mauris enim. Vestibulum vehicula tellus eget felis sollicitudin dapibus. Nunc tempor, elit sit amet malesuada tristique, mi est consequat arcu, id dapibus ante lorem aliquet neque. Aliquam non ex vitae odio tristique laoreet sit amet at ligula. Pellentesque ut nisi id felis convallis lobortis. Cras fringilla iaculis nulla a sollicitudin. Praesent ornare orci ut viverra porta.</Typography>

                    <Typography variant="body1">Nam semper, nisi eget luctus tempus, odio orci ornare tortor, at efficitur ex ipsum et ipsum. Donec vitae rutrum ligula, sed dictum nibh. Sed sollicitudin, leo interdum elementum bibendum, ante ante posuere ligula, ut pharetra est erat eget lectus. Morbi in urna condimentum, faucibus elit facilisis, rhoncus nisl. Nunc aliquam elementum magna in efficitur. In consequat metus ut nulla euismod vulputate. Sed sed dui lacus. Aliquam hendrerit ullamcorper lacus, a blandit leo sollicitudin non. Donec ut elit risus. Donec scelerisque hendrerit mauris sit amet venenatis. Mauris a mollis tellus. Pellentesque molestie sem et eros gravida sollicitudin. Quisque rhoncus, ex quis dapibus venenatis, massa ligula feugiat tellus, quis posuere elit urna id dolor. Donec ligula nulla, venenatis nec erat fermentum, luctus suscipit lacus. Vivamus elementum tortor sed eleifend accumsan.</Typography>
        </div>
    )

    
}
const styles = {
    root:{
        padding: 50,
        overFlow: "hidden"
    }
}

export default Rules;
