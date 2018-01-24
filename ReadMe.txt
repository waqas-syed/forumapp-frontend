1. Please install the following pre-requisites:
	- Visual Studio 2017.
	- .Net Core 1.0.
2. Open the solution 'src\ForumApp.Frontend\ForumApp.Frontend.sln' inside Visual Studio.
3. Wait a bit while the dependencies are resolved and downloaded automatically.
4. Open the 'Task Runner Explorer' window(View -> Other Windows -> Task Runner Explorer).
5. In the 'Task Runner Explorer' window, right click 'GruntFile.js -> Alias Tasks -> default' and click 'Run'.
6. After the task is run, right click the project ForumApp.Frontend and click 'Rebuild'.
7. Right click the ForumApp.Frontend project and click 'Debug -> Start a New Instance'.

P.S.: The frontend employs the standard MVC pattern used in AngularJS SPAs, so their is not much to spcefically document. Hence the Architectural_Decisions.pdf file is present in the VanHack-forumapp-backend repository, and is not required in the case of this frontend project.