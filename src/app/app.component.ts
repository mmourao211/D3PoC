import { Component } from '@angular/core';
import * as vis from 'vis'
import { Network } from 'vis';

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
          var data:vis.Data = {nodes: [], edges: []};
            
            var initialName:string = 'A'
            
            var recu = (depth: number, name: string) => {
              if(depth > 8) return;
              (data.nodes as any[]).push({id: name, label: name})
              var parentName = name.substr(0,name.length - 1);
              if(parentName)
                (data.edges as any[]).push({id: parentName + name, from: parentName, to: name})
              recu(depth + 1, name + "0");
              recu(depth + 1, name + "1");
              
            }
            recu(1, initialName);
            var n = new Network(document.getElementById("cy"), data, {physics:false, layout:{improvedLayout: true}});
            n.focus("A", {scale: 10})
          }
}
