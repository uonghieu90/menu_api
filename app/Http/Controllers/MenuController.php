<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menu;
class MenuController extends Controller
{
      public $successStatus = 200;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $menus=\App\Menu::all();
        $data=[];
        foreach($menus as $menu)
        {
            $data[]=$menu->toArray();
        }
           return response()->json(['success' => $data], $this-> successStatus);
        
    }
     
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $menu=new \App\Menu();
        $id=$request->id;
        if(empty($id)){
            
            $menu->name=$request->name;
            $menu->parent_id=$request->parent_id;
            $menu->save();
        }
        else
        {
            $menu=\App\Menu::find($id);
            $menu->name=$request->name;
            $menu->save(); 
        }
        return response()->json(['success'=>$menu->id], $this-> successStatus);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $menu=\App\Menu::find($id);
        return response()->json(['success'=>$menu], $this-> successStatus);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
            $menu=\App\Menu::find($request->id);
            $menu->delete();
        return response()->json(['success'=>'true'], $this-> successStatus);
    }
    public function destroys(Request $request)
    {
             $ids=$request->ids;
             foreach($ids as $id){
            $menu=\App\Menu::find($id);
            $menu->delete();
            }
        return response()->json(['success'=>'true'], $this-> successStatus);
    }
    

}
