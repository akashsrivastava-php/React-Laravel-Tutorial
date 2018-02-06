<?php

namespace App\Http\Controllers;

use App\ws;
use Illuminate\Http\Request;
use validator;

class WsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ws  $ws
     * @return \Illuminate\Http\Response
     */
    public function show(ws $ws)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ws  $ws
     * @return \Illuminate\Http\Response
     */
    public function edit(ws $ws)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ws  $ws
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ws $ws)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ws  $ws
     * @return \Illuminate\Http\Response
     */
    public function destroy(ws $ws)
    {
        //
    }

    public function login(Request $req){

        $this->validate($req, [
            'email' => 'required|email|exists:users,email',
            'pass' => 'required',
        ]);

        $email = $req->email;
        $pass = $req->pass;

        $getEmail = ws::get()->where('email', $email);
        if($getEmail[0]->password == $pass){
            $getEmail['status'] = "success"; 
            return response()->json($getEmail, 201);        
        }else{
            $data = array(); 
            $data['error'] = "error";
            $data['message'] = "password do not match";
            return response()->json($data, 404);
        }

    }
}
