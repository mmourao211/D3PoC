import { Component } from '@angular/core';
import * as sigma from 'sigma'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  getElements = 'app';
  elements = [];
  /**
   *
   */
  constructor() {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
        // Let's first initialize sigma:
        var s = new sigma('cy');
        
            // Finally, let's ask our sigma instance to refresh:
            
            var initialName:string = 'A'
            
            var recu = (depth: number, name: string, parentX: number) => {
              if(depth > 15) return;
              var newX = name.length == 1 ? 0 : (name.endsWith('0')? (parentX - 100.0/Math.pow(2,depth)) :(parentX + 100.0/Math.pow(2,depth)) );
              s.graph.addNode({
                // Main attributes:
                id: name,
                label: name,
                // Display attributes:
                size: 1000.0/depth,
                color: '#f00',
                x: newX ,
                y: depth
              })
              var parentName = name.substr(0,name.length - 1);
              if(parentName)
                s.graph.addEdge({
                  id: parentName + name,
                  // Reference extremities:
                  source: parentName,
                  target: name
                });
              recu(depth + 1, name + "0", newX);
              recu(depth + 1, name + "1", newX);
              
            }
            recu(1, initialName, 0);
            s.settings({
              // drawEdges: false,
              // batchEdgesDrawing: true,
              hideEdgesOnMove: true,
              drawLabels: false,
              minNodeSize: 0.001
            })
            s.camera.ratio = 0.01;
            s.refresh();
  }
}
