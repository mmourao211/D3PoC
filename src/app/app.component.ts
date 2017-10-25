import { Component } from '@angular/core';
import * as cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre'

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

    var initialName:string = 'A'

    var recu = (depth: number, name: string) => {
      if(depth > 15) return;
      this.elements.push({
        data: {
          id: name
        }
      })
      var parentName = name.substr(0,name.length - 1);
      if(parentName)
        this.elements.push({
          data:{
            id: parentName + name,
            source: parentName,
            target: name
          }
        })
        recu(depth + 1, name + "0");
        recu(depth + 1, name + "1");

    }
    recu(1, initialName);
    (cytoscape as any).use(dagre);
    var cy = cytoscape({
      container: document.getElementById('cy'),
      hideEdgesOnViewport: true,
      minZoom: 0.1,
      elements: this.elements,
        style: [
            {
                selector: 'node',
                style: {
                    shape: 'hexagon',
                    'background-color': 'red',
                    // label: 'data(id)'
                }
            }]
    });

    var layout: any = cy.layout({
              name: 'random', 
              fit: false, 
              directed: true,
              boundingBox:{x1: -10000,y1: -10000, x2: 10000,y2: 10000},
              ready: () => console.log('ready'),
              stop: () => console.log('stop')
            } as any)
    layout.on('layoutstart', () => console.log('layoutstart')).run();
  }
}
