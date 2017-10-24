import { Component } from '@angular/core';
import * as joint from 'jointjs'
import * as _ from 'underscore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  /**
   *
   */
  constructor() {

    var graph = new joint.dia.Graph;
    
    var paper = new joint.dia.Paper({
    
        el: $('#paper'),
        width: 10000,
        height: 10000,
        gridSize: 1,
        model: graph,
        interactive: false
        // interactive: {
        //   arrowheadMove: false,
        //   vertexMove: false,
        //   vertexAdd: false,
        //   vertexRemove: false,
        //   labelMove: false,
        //   useLinkTools: false
        // }
    });
    
function buildGraphFromAdjacencyList(adjacencyList) {
  
      var elements = [];
      var links = [];
      
      _.each(adjacencyList, function(edges, parentElementLabel) {
          elements.push(makeElement(parentElementLabel));
  
          _.each(edges as any, function(childElementLabel) {
              links.push(makeLink(parentElementLabel, childElementLabel));
          });
      });
  
      // Links must be added after all the elements. This is because when the links
      // are added to the graph, link source/target
      // elements must be in the graph already.
      return elements.concat(links);
  }
  
function makeLink(parentElementLabel, childElementLabel) {
  
      return new joint.dia.Link({
          source: { id: parentElementLabel },
          target: { id: childElementLabel },
          attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } },
          smooth: true
      });
  }
  
  function makeElement(label) {
  
      var maxLineLength = _.max(label.split('\n'), function(l:any) { return l.length; }).length;
  
      // Compute width/height of the rectangle based on the number 
      // of lines in the label and the letter size. 0.6 * letterSize is
      // an approximation of the monospace font letter width.
      var letterSize = 8;
      var width = 10;
      var height = 10;
  
      return new joint.shapes.basic.Rect({
          id: label,
          size: { width: width, height: height },
          attrs: {
              text: { text: label, 'font-size': letterSize, 'font-family': 'monospace' },
              rect: {
                  width: width, height: height,
                  rx: 5, ry: 5,
                  stroke: '#555'
              }
          },
          ports:{
            groups:{
              'a':{
                position: {
                    name: 'ellipseSpread',
                    args: {
                        dx: 1,
                        dy: 1,
                        dr: 1,
                        startAngle: 10,
                        step: 10,
                        compensateRotation: false
                    }
                }
              }
            }
          }
      } as any);
  }

  var name:string = "A"
    var adjacencyList = {
    }

    var recu = (depth: number, name: string) => {
      if(depth > 9) return;
      adjacencyList[name] = [];
      var parentName:string = name.substr(0,name.length - 1);
      if (parentName)
        adjacencyList[parentName].push(name);
      recu(depth + 1, name + "0")
      recu(depth + 1, name + "1")
    }
    recu(0, name)

  var cells = buildGraphFromAdjacencyList(adjacencyList);
  graph.resetCells(cells);

    var graphBBox = joint.layout.DirectedGraph.layout(graph, {
      nodeSep: 15,
      edgeSep: 10,
      rankSep: 10,
      rankDir: "LR"
  });
  console.log('x:', graphBBox.x, 'y:', graphBBox.y)
  console.log('width:', graphBBox.width, 'height:', graphBBox.height);
  }
}
