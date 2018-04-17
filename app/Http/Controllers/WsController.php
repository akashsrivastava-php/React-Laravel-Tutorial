<?php

namespace App\Http\Controllers;

use App\ws;
use Illuminate\Http\Request;
use validator;

class WsController extends Controller
{


    public function login(Request $req){

        $this->validate($req, [
            'email' => 'required|email|exists:users,email',
            'pass' => 'required',
        ]);

        $email = $req->email;
        $pass = $req->pass;

        $getEmail = ws::where('email', $email)->get()->first();
        if($getEmail->password == $pass){
            $getEmail['status'] = "success"; 
            return response()->json($getEmail, 201);        
        }else{
            $data = array(); 
            $data['error'] = "error";
            $data['message'] = "password do not match";
            return response()->json($data, 404);
        }

    }

    public function register(Request $request){

        $this->validate($request, [
            'email' => 'required|email|unique:users,email',
            'pass' => 'required',
            'name' => 'required',
        ]);

        $data = array(

            'email' => $request->email,
            'password' =>$request->pass,
            'name' => $request->name

            );

        $reg = ws::create($data);

        if($reg->id){

            $data = array('status'=>'success', 'response'=>'view');

            return response()->json($data, 201);

        }else{

            $data = array('status'=>'error', 'message'=>'something went wrong.');

            return response()->json($data, 500);

        }

    }

    public function view(Request $request){

        $response = ws::all();

        $data = array('status'=>'success', 'response'=>$response);

        return response()->json($data, 201);

    }

    public function edit(Request $request){

        $response = ws::find($request->id);

        if($response){

            $data = array('status'=>'success', 'response'=>$response);

            return response()->json($data, 201);

        }else{

            $data = array('error'=>'error', 'message'=>'Data not found');

            return response()->json($data, 404);

        }

    }

    public function update(Request $request){

        $this->validate($request, [
            'email' => 'required|unique:users,email,'.$request->id[0],
            'id' => 'required',
            'name' => 'required',
        ]);

        $name = $request->name;
        $email = $request->email;
        $pass = $request->pass;

        if($request->pass!=""){

            $data = array(

                'name' => $name[0],
                'email' => $email[0],
                'password' => $pass[0]

                );

            $update = ws::where('id', $request->id)
                            ->update($data);

            $response = array('status'=>'success', 'response'=>'');

            return response()->json($response, 200);

        }else{

            $data = array(

                'name' => $name,
                'email' => $email

                );

            $update = ws::where('id', $request->id)
                            ->update($data);

            $response = array('status'=>'success', 'response'=>'');

            return response()->json($response, 200);

        }

    }

    public function delete(Request $request){

        ws::where('id', $request->id)->delete();

        $response = array('status'=>'success', 'response'=>'');

        return response()->json($response, 200);

    }
}
