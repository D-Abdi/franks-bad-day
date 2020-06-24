class RouteAnim {
    constructor() {
        this.runRoutes = []
        this.runRoutes.push([{
         y: 460,
         ease: 'linear',
         duration: 500 
        },
      {
        x: 566,
        ease: 'linear',
        duration: 250
      },
      {
        y: 336,
        ease: 'linear',
        duration: 500
      },
      {
        x: 531,
        ease: 'linear',
        duration: 500
      },
      {
        y: 239,
        duration: 500
      },
      {
        x: 723,
        duration: 750,
        yoyo: true
      },
      {
        x: 291,
        duration: 800
      },
      {
        y: 725,
        duration: 2000
      },
      {
        x: 375,
        duration: 500
      },
      {
        x: 215,
        duration: 500
      },
      {
        y: 642,
        duration: 250
      },
      {
        x: 495,
        duration: 800
      },
      {
        y: 680,
        duration: 250
      }
      ])

      this.runRoutes.push([{
        y: 450,
        duration: 500
      },
    {
      x: 430,
      duration: 250
    },
    {
      y: 431,
      duration: 250
    },
    {
      x: 293,
      duration: 800
    },
    {
      y: 240,
      duration: 800
    },
    {
      x: 720,
      duration: 2000
    },
    {
      y: 425,
      duration: 800,
      yoyo: true
    },
    {
      x: 532,
      duration: 800
    },
    {
      y: 410,
      duration: 750
    },
    {
      x: 575,
      duration: 250
    }, 
    {
      y: 430,
      duration: 150
    },
    {
      x: 721,
      duration: 500
    }, 
    {
      y: 640,
      duration: 800
    },
    {
      x: 492,
      duration: 800
    }, 
    {
      y: 680,
      duration: 250
    }
    ])

    this.runRoutes.push([{
      y: 457,
      duration: 800
    },{
      x: 570,
      duration: 250
    },{
      y: 430,
      duration: 100
    },{
      x: 725,
      duration: 800
    },{
      y: 235,
      duration: 800 
     },{
      x: 533,
      duration: 800
     },{
      y: 404,
      duration: 750
     },{
      x: 430,
      duration: 500
     },{
      y: 430,
      duration: 100.
    },{
      x: 290,
      duration: 1000
    },{
      y: 240,
      duration: 1000
    },{
      y: 430,
      duration: 750
    },{
      x: 452,
      duration: 750
    },{
      y: 605,
      duration: 1000
    },{
      x: 495,
      duration: 250
    },{
      y:680,
      duration: 250
    },])
  }

    // Geef een random animatie
    returnRoute() {
        return this.runRoutes[Math.floor(Math.random() * this.runRoutes.length)]
    }
}

